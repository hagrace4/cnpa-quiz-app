# CNPA Quiz Questions Summary

## Overview
This quiz app contains **135 high-quality practice questions** for the CNCF Certified Cloud Native Platform Engineering Associate (CNPA) exam.

## Question Statistics

### Total Questions: 135
- Each quiz randomly selects **50 questions** from the pool
- Questions are renumbered CNPA-001 through CNPA-135

### By Difficulty Level
- **Easy**: 31 questions (23%)
- **Medium**: 74 questions (55%)
- **Hard**: 30 questions (22%)

### By Domain
- **Platform Engineering Core Fundamentals**: 30 questions
- **Platform Architecture and Capabilities**: 28 questions
- **Platform Security and Compliance**: 24 questions
- **Continuous Delivery & Platform Engineering**: 19 questions
- **Platform Observability**: 15 questions
- **Developer Experience**: 5 questions
- **Observability and Monitoring**: 5 questions
- **Other domains**: 9 questions

## Question Sources

### Original Sources (predata/)
1. **questions.json** - 30 questions (Python format, converted)
2. **questions_gpt.json** - 20 questions (GPT-generated)
3. **questions_additional_20.json** - 5 questions (LF-style)
4. **questions_comprehensive_45.json** - 29 questions (comprehensive coverage)
5. **questions_final_20.json** - 20 questions (final additions)
6. **questions_batch2_lf.json** - 16 questions (LF sample questions batch 2)
7. **questions_batch2_extended.json** - 15 questions (extended based on LF style)

### Question Quality
All questions follow the Linux Foundation style with:
- Clear, unambiguous question text
- 4 multiple-choice options
- Comprehensive explanations (150-200 words)
- Relevant tags for categorization
- Varied difficulty levels

## Topics Covered

### Platform Engineering Fundamentals
- Platform as a Product
- Team Topologies
- Golden Paths
- Self-Service Capabilities
- Cognitive Load Reduction
- Developer Experience
- Platform Metrics

### Architecture & Capabilities
- Kubernetes Operators
- Service Mesh
- Multi-Tenancy
- API Gateway Patterns
- Container Registries
- Ingress/Gateway API
- Stateful Workloads

### Security & Compliance
- RBAC and Least Privilege
- Pod Security Standards
- Network Policies
- Secrets Management
- Admission Controllers
- Supply Chain Security (SBOM)
- Runtime Security
- Zero Trust Networking

### CI/CD & Delivery
- GitOps Principles
- Pipeline as Code
- Deployment Strategies (Canary, Blue-Green)
- Progressive Delivery
- Feature Flags
- Trunk-Based Development
- Artifact Management

### Observability
- Three Pillars (Metrics, Logs, Traces)
- Prometheus Architecture
- Distributed Tracing
- SLOs and SLIs
- OpenTelemetry
- Alerting Best Practices
- Cost Observability

## Adding More Questions

To add new questions:

1. Create a new JSON file in `predata/` following the format:
```json
{
  "exam": "Certified Cloud Native Platform Engineering Associate",
  "short_code": "CNPA",
  "provider": "CNCF / Linux Foundation",
  "version": "2025-12-06",
  "source": "Description of source",
  "questions": [...]
}
```

2. Add the file to `scripts/convert_questions.py` in the `files_to_merge` list

3. Run the merge script:
```bash
python3 scripts/convert_questions.py
```

4. Update service worker cache version in `public/service-worker.js`

5. Hard refresh browser (`Ctrl+Shift+R`)

## Question Format

Each question follows this structure:
```json
{
  "id": "CNPA-XXX",
  "domain": "Domain Name",
  "topic": "Specific Topic",
  "difficulty": "easy|medium|hard",
  "question_type": "single_choice",
  "question_text": "Question text here?",
  "options": [
    {"id": "A", "text": "Option A text"},
    {"id": "B", "text": "Option B text"},
    {"id": "C", "text": "Option C text"},
    {"id": "D", "text": "Option D text"}
  ],
  "correct_option_ids": ["B"],
  "explanation": "Comprehensive explanation...",
  "tags": ["tag1", "tag2"]
}
```

## Future Enhancements

Potential improvements:
- Add more questions (target: 200+)
- Add multi-select questions
- Add scenario-based questions
- Filter questions by domain/difficulty
- Track performance by topic
- Spaced repetition for missed questions

---

**Last Updated**: December 6, 2025
**Total Questions**: 135
**Quiz Size**: 50 questions per attempt
