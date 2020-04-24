//import { L } from 'src/lib/abpUtility';

const rules = {
  userNameOrEmailAddress: [
    {
      required: true,
      message: "Username is required",
    },
  ],
  password: [{ required: true, message: "Password is required" }],
};

export default rules;
