import { EventEmitter } from "events";

type Channel = string | symbol;

type FunctionProps<T> = {
  [K in keyof T]: K extends Channel
    ? T[K] extends (...args: any[]) => void
      ? T[K]
      : never
    : never;
};

type NeverKey<T> = {
  [K in keyof T]: T[K] extends never ? K : never;
}[keyof T];

type MessageMap<T> = Omit<FunctionProps<T>, NeverKey<FunctionProps<T>>>;

interface TypeSafeEventEmitter<
  T extends { [key: Channel]: (...args: any[]) => void }
> extends EventEmitter {
  addListener<K extends keyof T>(channel: K, listener: T[K]): this;
  emit<K extends keyof T>(channel: K, ...args: Parameters<T[K]>): boolean;
  off<K extends keyof T>(channel: K, listener: T[K]): this;
  on<K extends keyof T>(channel: K, listener: T[K]): this;
  once<K extends keyof T>(channel: K, listener: T[K]): this;
  prependListener<K extends keyof T>(channel: K, listener: T[K]): this;
  prependOnceListener<K extends keyof T>(channel: K, listener: T[K]): this;
  removeAllListeners<K extends keyof T>(channel?: K): this;
  removeListener<K extends keyof T>(channel: K, listener: T[K]): this;
}

type EventEmitterOptions = ConstructorParameters<typeof EventEmitter>[0];

export default EventEmitter as {
  new <T>(options?: EventEmitterOptions): TypeSafeEventEmitter<MessageMap<T>>;
} & typeof EventEmitter;
