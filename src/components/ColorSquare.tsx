import { Square, SquareProps } from './Square';

export function ColorSquare(props: SquareProps) {
    return <Square {...props} borderRadius='radius14' />;
}
