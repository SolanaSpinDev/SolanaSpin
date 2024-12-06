interface Play {
  name: string;
  time: Date;
  outcome: string;
  prize: number;
}
interface Navigator {
    standalone: boolean;
}
interface Document {
    a: () => void;
}
interface Window {
    a: () => void; // Declare the specific type of `a`
}
