// delete product asynchronously without reloading the page or redirecting

const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const productElement = btn.closest("article");

  fetch(`/admin/products/${prodId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data.message);
      productElement.remove();
    })
    .catch((err) => {
      console.error("Error in fetch:", err);
    });
};
