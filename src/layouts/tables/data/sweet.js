import Swal from "sweetalert2";
// eslint-disable-next-line import/no-unresolved, import/newline-after-import
import axiosInstance from "services/axios";
const deleteTodo = (id) => {
  axiosInstance
    .delete(`/todo/${id}`)
    .then(() => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    })
    .catch((error) => Swal.fire("Erreur", error.toString(), "error"));
};

export default function Supprimer(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTodo(id);
    }
  });
}
