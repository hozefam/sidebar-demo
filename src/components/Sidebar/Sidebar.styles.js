import styled from '@emotion/styled';

export const SidebarContainer = styled.div`
  width: ${(p) => (!p.isSidebarOpen ? '5%' : '20%')};
  max-width: 280px;
  min-height: 80px;
  background-image: linear-gradient(
      315deg,
      rgba(144, 213, 236, 0.8) 0%,
      rgba(252, 87, 94, 0.8) 74%
    ),
    url(${(p) => p.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: white;
  position: relative;
  transition: 0.2s ease-in all;
`;

export const SidebarHeader = styled.h3`
  padding: 20px 0px;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 3px;
  font-family: ${(p) => p.font};
  font-size: 40px;
`;

export const MenuItemContainer = styled.div`
  cursor: pointer;
`;

export const ItemContainer = styled.div``;

export const MenuItem = styled.div`
  ${(p) =>
    !p.isSidebarOpen &&
    `
        text-align: center;
        ${p.isSelected && 'background-color: rgba(0,0,0,0.6);'}
    `};
  padding: 6px 20px;
  font-weight: 400;
  color: ${(p) => (p.isSelected ? 'rgba(255, 255, 255)' : 'rgba(19, 15, 64)')};
  font-family: ${(p) => p.font};
  white-space: nowrap;
  position: relative;
  transition: 0.2s ease-in all;

  &:hover {
    color: rgba(255, 255, 255);
    transition: 0.1s ease-in all;
  }

  &:after {
    content: '';
    border: 1px solid
      ${(p) => (p.isSelected ? 'rgba(255, 255, 255)' : 'rgba(225, 112, 85)')};
    display: ${(p) =>
      p.isSidebarOpen && p.isSelected && p.isOpen ? 'none' : 'block'};
    margin: 8px 0 4px;
  }

  ${(p) =>
    !p.isSelected &&
    `
    &:hover {
        &:after {
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: 0.1s ease-in all;    
        }
    }
  `}
`;

export const Text = styled.p`
  display: ${(p) => (p.isSidebarOpen ? 'inline' : 'none')};
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
  ${(p) =>
    p.isSidebarOpen &&
    `padding-right: 20px; transition: 0.2s ease-in padding-right`};
  filter: invert(1);
`;

export const DropdownIcon = styled.span`
  position: absolute;
  top: ${(p) => (p.isOpen ? '12px;' : '16px')};
  right: 24px;
  border: solid
    ${(p) => (p.isSelected ? 'rgba(255, 255, 255);' : 'rgba(225, 112, 85);')};
  border-width: 0 2px 2px 0;
  padding: 3px;
  transform: ${(p) => (p.isOpen ? 'rotate(-135deg);' : 'rotate(45deg);')};
  transition: 0.4s ease-in all;
`;

export const SubMenuItemContainer = styled.div`
  font-size: 14px;
  ${(p) => p.isSidebarOpen && 'padding-left: 15%'}
  ${(p) => !p.isSidebarOpen && 'text-align: center'}
`;

export const SubMenuItem = styled.p`
  color: ${(p) => (p.selected ? 'rgba(255, 255, 255);' : 'rgba(19, 15, 64);')};
  padding-top: 3%;

  &:hover {
    color: rgba(255, 255, 255);
  }
`;

// Toggler -----------------------------------------------------------------------------------------------

export const TogglerContainer = styled.div`
  position: absolute;
  width: 30%;
  bottom: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const Toggler = styled.div`
  height: 40px;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0.25em;
    width: 100%;
    height: 0.1em;
    background: #fff;
    box-shadow: 0 0.75em 0 0 #fff, 0 1.5em 0 0 #fff;
  }
`;
