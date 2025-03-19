// error controller

exports.getError = (req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: '/404',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.get500 = (req, res) => {
  res.status(500).render("500", {
    pageTitle: "An error occurred !",
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
};
