# Amazon ML Challenge 2025 — Rank 83

**Team: Cyber Titans**

The task was price prediction under a leaderboard that exposed every weak validation assumption. The team began around Rank 900, climbed, slipped during tuning, and finished at **Rank 83** with a **45.35 SMAPE** final submission.

## Rahul's role

Rahul led model development, training, submissions, deployment, and the AI/backend work alongside his teammates.

## Technical direction

- DeBERTa-v3-base
- hybrid mean / max / CLS pooling
- custom Log-MAE loss
- IQR-based outlier clipping
- NLP regression and disciplined leaderboard validation

The interesting part was not a magic model. It was the repeated loop of diagnosis, controlled changes, and knowing when a leaderboard movement was a real improvement.

![Amazon ML rank proof](/assets/proof/amazon-rank-83.jpg)
