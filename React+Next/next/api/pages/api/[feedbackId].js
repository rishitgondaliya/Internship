import { buildFeedbackPath, extractFeedback } from "./feedback";

export default function handler(req, res) {
  const fId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const feedback = data.find((fb) => fb.id === fId);
  res.status(200).json({ feedback: feedback });
}
