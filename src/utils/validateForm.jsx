function validateForm(form) {

  let errors = {};

  if (!form.firstName) {
    errors = { ...errors, firstName: "Please enter a first name." }
  }

  if (!form.lastName) {
    errors = { ...errors, lastName: "Please enter a last name." }
  }

  if (!form.mobile) {
    errors = { ...errors, mobile: "Please enter a phone number." }
  }

  if (form.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
    errors = { ...errors, email: "Please enter a valid email address." }
  }

  if (form.website && !form.website.includes('http')) {
    errors = { ...errors, website: "Please enter a valid website." }
  }

  if (form.avatar) {
    const size = form.avatar.size / 1024 / 1024;
    if (size > 2) {
      errors = { ...errors, avatar: "Please choose a photo under 2MB in size." }
    } else if (!["jpg", "jpeg", "png"].includes(form.avatar.name.split('.').pop())) {
      errors = { ...errors, avatar: "Please make sure your photo has a valid extension." }
    }
  }

  return errors

}

export default validateForm