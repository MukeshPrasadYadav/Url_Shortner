import React, { useState } from "react";
import { Button, Modal, Input, Typography, Divider } from "antd";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { useTheme } from "../../Providers/ThemeProvider";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const SignUp = () => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(true);

  const validationSchema = object({
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Modal
      closable={false}
      title={
        <Title
          level={3}
          style={{
            margin: 0,
            color: isDark ? "#ffffff" : "#000000",
            textAlign: "center",
          }}
        >
          Create Your Account
        </Title>
      }
      open={open}
      centered
      footer={null}
      onCancel={() => setOpen(false)}
      bodyStyle={{
        backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
        borderRadius: 10,
        padding: "1.5rem",
      }}
      destroyOnClose
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("✅ Submitted:", values);
          setOpen(false);
        }}
      >
        {({ values, handleChange, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {/* First Name */}
              <div>
                <Text strong style={{ color: isDark ? "#cccccc" : "#333333" }}>
                  First Name
                </Text>
                <Field
                  as={Input}
                  name="firstName"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChange={handleChange}
                  className="mt-1"
                  size="large"
                />
                {errors.firstName && touched.firstName && (
                  <Text type="danger" className="text-sm">
                    {errors.firstName}
                  </Text>
                )}
              </div>

              {/* Last Name */}
              <div>
                <Text strong style={{ color: isDark ? "#cccccc" : "#333333" }}>
                  Last Name
                </Text>
                <Field
                  as={Input}
                  name="lastName"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="mt-1"
                  size="large"
                />
                {errors.lastName && touched.lastName && (
                  <Text type="danger" className="text-sm">
                    {errors.lastName}
                  </Text>
                )}
              </div>

              {/* Email */}
              <div>
                <Text strong style={{ color: isDark ? "#cccccc" : "#333333" }}>
                  Email
                </Text>
                <Field
                  as={Input}
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  className="mt-1"
                  size="large"
                />
                {errors.email && touched.email && (
                  <Text type="danger" className="text-sm">
                    {errors.email}
                  </Text>
                )}
              </div>

              {/* Password */}
              <div>
                <Text strong style={{ color: isDark ? "#cccccc" : "#333333" }}>
                  Password
                </Text>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  className="mt-1"
                  size="large"
                />
                {errors.password && touched.password && (
                  <Text type="danger" className="text-sm">
                    {errors.password}
                  </Text>
                )}
              </div>

              {/* Submit Button */}
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-full mt-2"
              >
                Sign Up
              </Button>

              <Divider style={{ margin: "1rem 0" }}>or</Divider>

              {/* Already have account */}
              <div
                style={{
                  textAlign: "center",
                  color: isDark ? "#b5b5b5" : "#666666",
                }}
              >
                Already have an account?{" "}
                <Link to='/'  style={{ color: isDark ? "#722ed1" : "#1677ff" }}>
                    Login
                </Link>
                  
                
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignUp;
