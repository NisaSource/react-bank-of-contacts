import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { loginUser, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}
		if (error) {
			setAlert(error, "danger");
			clearErrors();
		}
		// esliint-disbale-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const { email, password } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		loginUser({
			email,
			password,
		});
	};

	return (
		<Container fluid className="app">
			<Row className="">
				<Col>
					<Card className="bg-color">
						<CardTitle className="pt-2 pl-4 text-center display-4">
							User <span className="text-primary">Login</span>
						</CardTitle>

						<CardBody>
							<Form onSubmit={onSubmit}>
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
								<Button
									type="submit"
									color="primary"
									className="mb-2 primary btn-md btn-block"
								>
									Login
								</Button>
								Don't have an account? <Link to="/register">Register</Link>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
