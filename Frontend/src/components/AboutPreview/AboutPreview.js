import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaAward, FaUsers, FaClock } from 'react-icons/fa';

import {
  Section,
  Container,
  Content,
  TextContent,
  Title,
  Subtitle,
  Description,
  Features,
  Feature,
  FeatureIcon,
  FeatureText,
  Button,
  ImageContent
} from './AboutPreview.styles';

const AboutPreview = () => {
  const features = [
    {
      icon: <FaAward />,
      text: '5 ans d\'expérience'
    },
    {
      icon: <FaUsers />,
      text: 'Équipe professionnelle'
    },
    {
      icon: <FaClock />,
      text: 'Ouvert 7j/7'
    }
  ];

  return (
    <Section>
      <Container>
        <Content>
          <TextContent>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Title>À propos de nous</Title>
              <Subtitle>L'excellence de la coiffure</Subtitle>
              <Description>
                Depuis plusieurs années, notre barbershop s'impose comme la référence de la coiffure. 
                Notre équipe de maîtres barbiers passionnés vous offre une expérience 
                unique alliant tradition et modernité.
              </Description>
              
              <Features>
                {features.map((feature, index) => (
                  <Feature key={index}>
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <FeatureText>{feature.text}</FeatureText>
                  </Feature>
                ))}
              </Features>
              
              <Button as={Link} to="/about">
                En savoir plus
                <FaArrowRight />
              </Button>
            </motion.div>
          </TextContent>
          
          <ImageContent>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="about-image-placeholder">
                <div className="image-content">
                  <h3>Notre équipe</h3>
                  <p>Des professionnels passionnés</p>
                </div>
              </div>
            </motion.div>
          </ImageContent>
        </Content>
      </Container>
    </Section>
  );
};

export default AboutPreview;
