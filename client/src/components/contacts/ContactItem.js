import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { Badge, Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import ContactContext from "../../context/contact/contactContext";
import "react-toastify/dist/ReactToastify.css";

const ContactItem = ({ contact, toggleModal }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;

	const { _id, name, email, phone, status, birthday } = contact;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
		notify();
	};

	const notify = () => toast.error(`You have removed ${name}`);

	return (
		<div>
			<ToastContainer t />
			<Row>
				<Col>
					<Card body className="bg-dark mb-4">
						<CardTitle className="text-mycolor text-left">
							<Row>
								<Col>
									<h2>{name}</h2>
								</Col>
								<Col className="text-right">
									<Button
										className="bg-color btn-sm"
										onClick={() => {
											toggleModal();
											setCurrent(contact);
										}}
									>
										<i className="fas fa-edit"></i>
									</Button>{" "}
									<Button className="btn btn-danger btn-sm" onClick={onDelete}>
										<i className="fas fa-trash-alt"></i>
									</Button>
								</Col>
							</Row>
						</CardTitle>
						<CardText>
							{email && (
								<span>
									<i className="fas fa-envelope-open"></i> {email}
								</span>
							)}{" "}
							<br />
							{phone && (
								<span>
									{" "}
									<i className="fas fa-phone"></i> {phone}
								</span>
							)}{" "}
							<br />
							{birthday && (
								<span>
									{" "}
									<i className="fas fa-birthday-cake"></i> {birthday}
								</span>
							)}
						</CardText>
						<div>
							<Badge
								className={status === "single" ? "bg-color" : "bdg-success"}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</Badge>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItem;
