import { Square, SquareProps } from './Square';

export function ColorSquare(props: SquareProps) {
    return <Square {...props} bg='accent.blue' borderRadius='radius14' />;
}
