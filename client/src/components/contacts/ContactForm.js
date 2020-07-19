import React, { useState, useContext, useEffect, Fragment } from "react";
import { Button, Card, Form, FormGroup, Label, Input } from "reactstrap";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = ({ toggleModal }) => {
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, current, clearCurrent } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: "",
				email: "",
				phone: "",
				status: "single",
				birthday: "",
			});
		}
	}, [contactContext, current]);

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		status: "single",
		birthday: "",
	});

	const { name, email, phone, status, birthday } = contact;

	const onChange = (e) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
		toggleModal();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<Fragment>
			<Card className="bg-color">
				<Form onSubmit={onSubmit}>
					<FormGroup>
						<Input
							type="text"
							placeholder="Name"
							name="name"
							value={name}
							onChange={onChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type="text"
							placeholder="Email"
							name="email"
							value={email}
							onChange={onChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type="text"
							placeholder="Phone"
							name="phone"
							value={phone}
							onChange={onChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type="text"
							placeholder="Birthday"
							name="birthday"
							value={birthday}
							onChange={onChange}
						/>
					</FormGroup>

					<h5>Contact Status</h5>
					<FormGroup check>
						<Label check>
							<Input
								type="radio"
								name="status"
								value="single"
								checked={status === "single"}
								onChange={onChange}
							/>{" "}
							Single
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								type="radio"
								name="status"
								value="married"
								checked={status === "married"}
								onChange={onChange}
							/>
							Married{" "}
						</Label>
					</FormGroup>
					<FormGroup>
						<Input
							type="submit"
							value={current ? "Update Contact" : "Add New Contact"}
							className="bg-black btn-block"
						/>
					</FormGroup>
					{current && (
						<div>
							<Button className="btn btn-light btn-block" onClick={clearAll}>
								Clear
							</Button>
						</div>
					)}
				</Form>
			</Card>
		</Fragment>
	);
};

export default ContactForm;
