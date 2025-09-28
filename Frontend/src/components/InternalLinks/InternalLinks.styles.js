import styled from 'styled-components';

export const InternalLinksContainer = styled.section`
  padding: 4rem 0;
  background: white;
`;

export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
`;

export const LinkCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: white;
    border-color: #d4af37;
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.15);
  }
`;

export const LinkIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin: 0 auto 1.5rem;
`;

export const LinkTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const LinkDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const LinkButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #b8941f, #d4af37);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  }
`;

export const SEOKeywords = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;

  h3 {
    font-size: 1.2rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .keyword-tag {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background: #e9ecef;
    color: #495057;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: #d4af37;
      color: white;
      transform: translateY(-1px);
    }
  }
`;

// Responsive design
@media (max-width: 768px) {
  ${InternalLinksContainer} {
    padding: 3rem 0;
  }

  ${LinksGrid} {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  ${LinkCard} {
    padding: 1.5rem;
  }

  ${LinkTitle} {
    font-size: 1.2rem;
  }

  ${SEOKeywords} {
    padding: 0 1rem;

    .keywords-list {
      gap: 0.3rem;
    }

    .keyword-tag {
      font-size: 0.8rem;
      padding: 0.3rem 0.6rem;
    }
  }
}
