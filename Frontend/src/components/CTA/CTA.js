import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaCalendarAlt } from 'react-icons/fa';

import {
  Section,
  Container,
  Content,
  TextContent,
  Title,
  Subtitle,
  Description,
  Buttons,
  Button,
  ButtonSecondary,
  ContactInfo,
  ContactItem
} from './CTA.styles';

const CTA = () => {
  return (
    <Section>
      <Container>
        <Content>
          <TextContent>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Title>Prêt pour votre prochaine coupe ?</Title>
              <Subtitle>Réservez votre créneau en quelques clics</Subtitle>
              <Description>
                Découvrez l'excellence de la coiffure masculine avec notre équipe de professionnels. 
                Réservation simple, service premium, résultat garanti.
              </Description>
              
              <Buttons>
                <Button as={Link} to="/booking">
                  <FaCalendarAlt />
                  Réserver maintenant
                  <FaArrowRight />
                </Button>
                <ButtonSecondary as={Link} to="/contact">
                  <FaPhone />
                  Nous contacter
                </ButtonSecondary>
              </Buttons>
              
              <ContactInfo>
                <ContactItem>
                  <FaPhone />
                  <span>02 99 12 34 56</span>
                </ContactItem>
                <ContactItem>
                  <FaCalendarAlt />
                  <span>Ouvert 7j/7</span>
                </ContactItem>
              </ContactInfo>
            </motion.div>
          </TextContent>
        </Content>
      </Container>
    </Section>
  );
};

export default CTA;

