import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardContainer = styled.div`
  min-height: calc(100vh - 70px);
  background: #f8f9fa;
  padding: 0;
`;

export const DashboardHeader = styled.header`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #1a1a1a;
  padding: 2rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e9ecef;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  color: #ccc;
  font-weight: 400;
`;

export const LogoutButton = styled.button`
  background: rgba(212, 175, 55, 0.2);
  color: #d4af37;
  border: 2px solid #d4af37;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #d4af37;
    color: #1a1a1a;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

export const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d4af37, #e0c26f);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

export const StatChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#28a745' : '#666'};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: '${props => props.positive ? '↗' : '→'}';
    font-size: 0.8rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  height: fit-content;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

export const CardAction = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  background: #d4af37;
  color: #1a1a1a;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: #e0c26f;
    transform: translateY(-2px);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const TableHeader = styled.thead`
  background: #f8f9fa;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
  vertical-align: middle;
`;

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.color}20;
  color: ${props => props.color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #666;
  font-size: 1.1rem;

  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    color: #d4af37;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #dc3545;
  font-size: 1.1rem;
  text-align: center;

  svg {
    font-size: 2rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
`;

export const ChartContainer = styled.div`
  height: 300px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
`;

export const RecentBookings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 735px;
  overflow-y: auto;
`;

export const BookingItem = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 0px 15px 0px 15px;
  border-left: 4px solid #d4af37;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }
`;

export const BookingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BookingStatus = styled.div`
  flex-shrink: 0;
`;

export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  min-height: 450px;
`;

export const ActionCard = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: white;
    border-color: #d4af37;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ActionIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin: 0 auto 1rem;
`;

export const ActionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
`;

export const ActionDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

// Styles pour les modals
export const Modal = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
`;

export const ModalOverlay = styled.div`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.5);
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 20px;
  backdrop-filter: blur(2px);
  margin: 0 !important;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 0 24px;
  
  p {
    margin: 0 0 12px 0;
    color: #555;
    line-height: 1.5;
  }
`;

export const ModalActions = styled.div`
  padding: 20px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #ddd;
  background: #fff;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    border-color: #ccc;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    background: #d4af37;
    color: white;
    border-color: #d4af37;
    
    &:hover:not(:disabled) {
      background: #e0c26f;
      border-color: #e0c26f;
    }
  }
`;

export const BookingDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const BookingDetailIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

export const BookingDetailContent = styled.div`
  flex: 1;
`;

export const BookingDetailLabel = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

export const BookingDetailValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }
`;

// Styles pour les statistiques avancées
export const DetailedStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const StatSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
`;

export const StatSectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const StatItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatItemName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`;

export const StatItemDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
`;

export const StatItemValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const StatItemMain = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
`;

export const StatItemSecondary = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

export const StatItemGrowth = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  
  &.positive {
    color: #27ae60;
  }
  
  &.negative {
    color: #e74c3c;
  }
`;

export const StatItemIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-right: 0.75rem;
`;

export const TrendChart = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  color: #666;
  font-style: italic;
`;

export const RatingStars = styled.div`
  display: flex;
  gap: 0.125rem;
  margin-top: 0.25rem;
`;

export const Star = styled.span`
  color: ${props => props.filled ? '#f39c12' : '#ddd'};
  font-size: 0.8rem;
`;

export const SpecialtyTags = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
`;

export const SpecialtyTag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.125rem 0.375rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
`;

export const OccupancyBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.25rem;
`;

export const OccupancyFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #27ae60, #2ecc71);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;
