function validateForm(form) {

  let errors = {}

  if (!form.firstName) {
    errors = { ...errors, firstName: "First name required." }
  }

  if (!form.lastName) {
    errors = { ...errors, lastName: "Last name required." }
  }

  if (!form.mobile) {
    errors = { ...errors, mobile: "Phone number required." }
  }

  if (form.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
    errors = { ...errors, email: "Invalid email address." }
  }

  if (form.website && !form.website.includes('http')) {
    errors = { ...errors, website: "Invalid website." }
  }

  if (form.avatarImage) {
    const size = form.avatarImage.size / 1024 / 1024;
    if (size > 2) {
      errors = { ...errors, avatarImage: "Photo must be under 2MB in size." }
    } else if (!["jpg", "jpeg", "png"].includes(form.avatarImage.name.split('.').pop())) {
      errors = { ...errors, avatarImage: "Invalid photo extension." }
    }
  }

  return errors

}

export default validateForm