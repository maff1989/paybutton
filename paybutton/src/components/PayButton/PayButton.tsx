import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import { Theme, ThemeName, ThemeProvider, useTheme } from '../../themes';
import Button, { ButtonProps } from '../Button/Button';
import {
  WidgetContainer,
  cryptoCurrency,
  currency,
} from '../Widget/WidgetContainer';

export interface PayButtonProps extends ButtonProps {
  to: string;
  amount?: number;
  currency?: currency;
  randomSatoshis?: boolean;
  displayCurrency?: cryptoCurrency;
  hideToasts?: boolean;
  hoverText?: string;
  onSuccess?: (txid: string, amount: number) => void;
  onTransaction?: (txid: string, amount: number) => void;
  theme?: ThemeName | Theme;
  text?: string;
}

export const PayButton = (props: PayButtonProps): React.ReactElement => {
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    to: address,
    amount,
    currency,
    animation = 'slide',
    randomSatoshis = true,
    displayCurrency,
    hideToasts = false,
    hoverText,
    onSuccess,
    onTransaction,
    text,
  } = props;

  const handleButtonClick = (): void => setWidgetOpen(true);
  const handleWidgetClose = (): void => setWidgetOpen(false);
  const handleSuccess = (txid: string, amount: number): void => {
    setSuccess(true);
    onSuccess?.(txid, amount);
  };

  const AnimatedButton: React.FC<ButtonProps> = (
    props: ButtonProps,
  ): React.ReactElement => <Button animation={animation} {...props} />;

  const theme = useTheme(props.theme);

  return (
    <ThemeProvider value={theme}>
      <AnimatedButton onClick={handleButtonClick} hoverText={hoverText}>
        {text}
      </AnimatedButton>
      <Dialog open={widgetOpen} onClose={handleWidgetClose} keepMounted>
        <WidgetContainer
          ButtonComponent={AnimatedButton}
          active={widgetOpen}
          address={address}
          amount={amount}
          currency={currency}
          randomSatoshis={randomSatoshis}
          displayCurrency={displayCurrency}
          hideToasts={hideToasts}
          onSuccess={handleSuccess}
          onTransaction={onTransaction}
          foot={
            success && (
              <AnimatedButton onClick={handleWidgetClose} hoverText="Close">
                Close
              </AnimatedButton>
            )
          }
        />
      </Dialog>
    </ThemeProvider>
  );
};

export default PayButton;