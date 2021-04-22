import Swal from 'sweetalert2'

const toast = Swal.mixin({
  toast: true,
  timer: 2500,
  position: 'top-end',
  showCloseButton: true,
  showConfirmButton: false
})

export default toast
