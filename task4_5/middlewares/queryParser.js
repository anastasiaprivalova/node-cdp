export default function queryParser (req, res, next) {
  req.parsedQuery = req.query;
  next();
}