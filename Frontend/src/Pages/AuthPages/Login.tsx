import React, { useState } from "react";
import { Button, Modal, Input, Typography } from "antd";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { useTheme } from "../../Providers/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const { Text, Title } = Typography;

const Login = () => {
  const { isDark } = useTheme();
  const[error,setError]=React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(true);
  const navigate=useNavigate()

  const validationSchema = object({
    email: string().email("Invalid email address").required("Email is required"),
    password: string().required("Password is required"),
  });

  return (
    <Modal
      title={
        <Title
          level={3}
          style={{
            margin: 0,
            color: isDark ? "#ffffff" : "#000000",
            textAlign: "center",
          }}
        >
          Login to Your Account
        </Title>
      }
      open={open}
      closable={false}
      centered
      footer={null}
      bodyStyle={{
        
        borderRadius: 10,
        padding: "1.5rem",
      }}
      destroyOnClose
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async(values) => {
          const res=await axios.post(`http://localhost:5000/api/auth/login`,values,{withCredentials:true});
           if(res?.data?.success) console.log("res",res)
          //   setError(res?.message)
          console.log(res)
        //  setOpen(false);
        }}
      >
        {({ values, handleChange, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {/* Email Field */}
              <div>
                <Text
                  strong
                  style={{ color: isDark ? "#cccccc" : "#333333" }}
                >
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

              {/* Password Field */}
              <div>
                <Text
                  strong
                  style={{ color: isDark ? "#cccccc" : "#333333" }}
                >
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
                Login
              </Button>

              {/* Optional Footer */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  color: isDark ? "#b5b5b5" : "#666666",
                }}
              >
                Don’t have an account?{" "}
                <Link to={'/SignUp'} style={{ color: isDark ? "#722ed1" : "#1677ff" }}>
                  Sign up
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Login;
