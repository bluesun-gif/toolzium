# CLAIM LOG — append ONLY your own lines, never edit others'.
# RULE: before working a batch, claim it here, THEN `git pull` to confirm no one
# else claimed the same batch. If a collision appears, release (don't delete
# others' lines — just pick a different unclaimed batch).
# Claim format:   BATCH <batch-id> SESSION <tag> STATUS claimed TIME <ISO>
# Done format:    BATCH <batch-id> SESSION <tag> STATUS done TIME <ISO> COMMIT <sha>
#
# Pre-reserved by controller (2026-08-14) for the first 4 sessions — do NOT claim these:
BATCH B01 SESSION ctrl-reserved STATUS claimed TIME 2026-08-14
BATCH B02 SESSION ctrl-reserved STATUS claimed TIME 2026-08-14
BATCH B03 SESSION ctrl-reserved STATUS claimed TIME 2026-08-14
BATCH B04 SESSION ctrl-reserved STATUS claimed TIME 2026-08-14
#
# Current open batches for new sessions to claim (unreserved): B05, B06, B07, B08,
# B09, B10, B11, B12.
#
