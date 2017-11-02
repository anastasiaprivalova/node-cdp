export default function cookieParser (req, res, next) {
  if(req.headers.cookie) {
    const cookiesArray = req.headers.cookie.replace(/\s/g, '').split(';');

    req.parsedCookies = cookiesArray.reduce((prev, curr) => {
      let [key, value] = curr.split('=');
      prev[key] = value;
      return prev;
    }, {});
  } else {
    req.parsedCookies = {};
  }

  next();
}