#!/usr/bin/env bash
# Download images listed in a TSV into assets/img/gallery/.
#
# Expected TSV columns:  index <tab> owner <tab> kind <tab> width <tab> permalink <tab> url
# (this is the format written to _working/instagram-posts.tsv)
#
# Instagram CDN URLs are signed and expire within hours, so run this soon after
# collecting them or the requests will 403.
#
#   ./tools/download_images.sh ../_working/instagram-posts.tsv

set -uo pipefail

TSV="${1:?usage: download_images.sh <posts.tsv> [owner-filter]}"
ONLY_OWNER="${2:-elevationboxingacademy}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/assets/img/gallery"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

mkdir -p "$DEST"
ok=0; skipped=0; failed=0

# The trailing `[ -n "$url" ]` catches a final line with no newline.
while IFS=$'\t' read -r n owner kind w href url || [ -n "${url:-}" ]; do
  [ -z "${url:-}" ] && continue

  if [ -n "$ONLY_OWNER" ] && [ "$owner" != "$ONLY_OWNER" ]; then
    skipped=$((skipped + 1)); continue
  fi

  out="$DEST/eba-$(printf '%02d' "$n").jpg"
  code=$(curl -s -A "$UA" -e "https://www.instagram.com/" -L "$url" -o "$out" -w "%{http_code}")
  size=$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out" 2>/dev/null || echo 0)

  if [ "$code" = "200" ] && [ "$size" -gt 5000 ]; then
    # Instagram sometimes serves WebP regardless of the .jpg path.
    if [ "$(dd if="$out" bs=1 skip=8 count=4 2>/dev/null)" = "WEBP" ]; then
      mv "$out" "${out%.jpg}.webp"
    fi
    ok=$((ok + 1))
  else
    echo "failed: index $n (http $code, $size bytes)" >&2
    rm -f "$out"
    failed=$((failed + 1))
  fi
done < "$TSV"

echo "downloaded $ok, skipped $skipped (other owners), failed $failed"
echo "Remember to list new files in data/gallery.js with alt text."
