import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Button,
	CardBody,
	CardTitle,
	Card,
	Container,
} from "reactstrap";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;

	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}
		if (error) {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disbale-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
	});

	const { name, email, password, confirm } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (name === "" || email === "" || password === "") {
			setAlert("Please fill the blank", "danger");
		} else if (password !== confirm) {
			setAlert("Password not match", "danger");
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<Container fluid className="app">
			<Row className="">
				<Col>
					<Card className="bg-color">
						<CardTitle className="pt-2 pl-4 text-center display-4">
							User <span className="text-primary">Register</span>
						</CardTitle>

						<CardBody>
							<Form onSubmit={onSubmit}>
								<FormGroup>
									<Label className="float-left" for="name">
										Name
									</Label>
									<Input
										type="text"
										name="name"
										value={name}
										onChange={onChange}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label className="float-left" for="email">
										Email
									</Label>
									<Input
										type="email"
										name="email"
										value={email}
										onChange={onChange}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label className="float-left" for="password">
										Password
									</Label>
									<Input
										type="password"
										name="password"
										value={password}
										onChange={onChange}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label className="float-left" for="confirm">
										Confirm Password
									</Label>
									<Input
										type="password"
										name="confirm"
										value={confirm}
										onChange={onChange}
										required
									/>
								</FormGroup>
								<Button
									variant="primary"
									type="submit"
									color="primary"
									className="mb-2 btn-md btn-block"
								>
									Register
								</Button>
								<p className="pt-2 float-left">
									Already have an account? <Link to="/login">Login</Link>
								</p>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Register;
