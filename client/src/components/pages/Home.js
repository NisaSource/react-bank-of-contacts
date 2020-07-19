import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Home = () => {
	const [modal, setModal] = useState(false);

	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const { current } = contactContext;

	const { user } = authContext;

	useEffect(() => {
		authContext.loadUser();
		//eslint-disable-next-line
	}, []);

	const toggle = () => setModal(!modal);

	return (
		<Container>
			<Row>
				<Col>
					<Modal className="my-modal" isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle}>
							<span>{current ? "Edit Contact" : "Add New Contact"}</span>
						</ModalHeader>
						<ModalBody>
							<ContactForm toggleModal={toggle} />
						</ModalBody>
					</Modal>
					<Row className="d-flex justify-content-between">
						<Col>
							<h1 className="pull-left mb-5 pt-2">Hello {user && user.name}</h1>
						</Col>
						<Col>
							<ContactFilter toggleModal={toggle} />
						</Col>
					</Row>

					<Contacts toggleModal={toggle} />
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
