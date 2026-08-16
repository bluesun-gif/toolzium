# Toolzium Assignment Table (AUTO-BALANCED)
# Controller assigns by BATCH (not whole category) so we can scale to N sessions.
# Sessions claim a batch from `.agents/CLAIM.md` (append "<batch-id> <session-tag>")
# then work ONLY those tools, then mark done in `.agents/status-<tag>.md`.
# Each batch ~15-25 tools. Quality bar identical everywhere (see TOOLZIUM_PLAYBOOK.md).

# Batch list: id | categories/slugs | approx count
B01 | dev (all 66) | 66
B02 | finance (all 53) | 53
B03 | health (all 49) | 49
B04 | image (all 45) | 45
B05 | productivity (all 43) | 43
B06 | fun (all 41) | 41
B07 | office (all 39) | 39
B08 | travel (33) + time (33) | 66
B09 | text (28) + util (23) | 51
B10 | network (19) + calc (17) + seo (8) + marketing (3) | 47
B11 | social (14) + pdf (8) + url (7) + gaming (7) | 36
B12 | writing (6) + ai (9, minus ats-checker done) + academic (5, minus essay done) | 18
