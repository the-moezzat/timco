import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    // gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
`;

const Error = styled.span`
  font-size: 14px;
  margin-top: 4px;
  color: #ff6b6b;
`;

function FormRow({
  label,
  error,
  children,
}: {
  label: string;
  error: string;
  children: React.ReactElement;
}) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
