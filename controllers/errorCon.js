exports.pageNotFound = (req, res) => {
  res.status(404).render("errorPage", {
    pageTitle: "Page Not Found",
    currantPage: "errorPage",
  });
};
