import styled from 'styled-components';

export const SEOContainer = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
`;

export const SEOGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
`;

export const SEOItem = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

export const SEOIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
`;

export const SEOTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const SEODescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

export const SEOFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;

  svg {
    color: #d4af37;
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
`;

export const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: linear-gradient(135deg, #b8941f, #d4af37);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  }
`;

export const SEOStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

// Responsive design
@media (max-width: 768px) {
  ${SEOContainer} {
    padding: 3rem 0;
  }

  ${SEOGrid} {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  ${SEOItem} {
    padding: 1.5rem;
  }

  ${SEOTitle} {
    font-size: 1.3rem;
  }

  ${SEOStats} {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1rem;
  }

  ${StatNumber} {
    font-size: 2rem;
  }
}
