import vine from "@vinejs/vine";

vine.convertEmptyStringsToNull = true;

export default {
  LOG_UP_BODY: vine.create({
    email: vine
      .string()
      .trim()
      .escape()
      .email(),
    password: vine
      .string()
      .trim()
      .escape()
      .minLength(12)
      .confirmed({ as: "confirmPassword" }),
    confirmPassword: vine
      .string()
      .trim()
      .escape()
      .minLength(12)
      .sameAs("password")
  })
};
