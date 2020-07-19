import React, { Fragment, useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";

import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import FingerLoading from "../layout/FingerLoading";

const Contacts = ({ toggleModal }) => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered, getContact, loading } = contactContext;

	useEffect(() => {
		getContact();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please Add Any Contact</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<Row>
					{filtered !== null
						? filtered.map((contact) => (
								<Col sm="6" key={contact._id}>
									<ContactItem contact={contact} toggleModal={toggleModal} />
								</Col>
						  ))
						: contacts.map((contact) => (
								<Col sm="6" key={contact._id}>
									<ContactItem contact={contact} toggleModal={toggleModal} />
								</Col>
						  ))}
				</Row>
			) : (
				<FingerLoading />
			)}
		</Fragment>
	);
};

export default Contacts;
