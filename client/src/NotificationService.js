
import swal from "sweetalert2";
export default class NotificationService {

  static async confirmAction(text = "You won't be able to revert this!") {
    try {
      let res = await swal.fire({
        title: 'You good bro?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (res.value) {
        return true;
      }
      return false;
    } catch (error) {
      this.toast(error);
    }
  }

  static toast(title = "default handler", timer = 3500, icon = 'success') {
    // @ts-ignore
    swal.fire({
      title,
      icon: icon,
      timer,
      showConfirmButton: false,
      position: "top",
      toast: true
    });
  }

  static async inputData(title = "Create Form") {
    try {
      const { value: formValues } = await swal.fire({
        title,
        html:
          '<input id="swal-input1" class="swal2-input">' +
          '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById('swal-input1').value,
            // @ts-ignore
            document.getElementById('swal-input2').value
          ];
        }
      });
      if (formValues) {
        return { title: formValues[0], description: formValues[1] };
      }
      else this.toast("Something Unexpected Happened");
    } catch (e) {
      return false;
    }
  }

}



