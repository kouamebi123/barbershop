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
              <Title>Meilleur Barbershop Rennes - À Propos</Title>
              <Subtitle>L'excellence de la coiffure homme à Rennes</Subtitle>
              <Description>
                Depuis plusieurs années, notre barbershop s'impose comme le meilleur barbershop à Rennes. 
                Spécialisés en coupe homme, taille barbe et dégradé, notre équipe de maîtres barbiers passionnés 
                vous offre une expérience unique alliant tradition et modernité dans notre salon tendance.
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
                  <h3>Barber Tendance Rennes</h3>
                  <p>Équipe spécialisée coiffure homme stylé</p>
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
