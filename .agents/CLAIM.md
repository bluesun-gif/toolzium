# CLAIM LOG — append ONLY your own lines, never edit others'.
# RULE: before working a batch, claim it here, THEN `git pull` to confirm no one
# else claimed the same batch. If a collision appears, release (don't delete
# others' lines — just pick a different unclaimed batch).
# Claim format:   BATCH <batch-id> SESSION <tag> STATUS claimed TIME <ISO>
# Done format:    BATCH <batch-id> SESSION <tag> STATUS done TIME <ISO> COMMIT <sha>
#
# Current claims (empty — claim your batch before starting):
