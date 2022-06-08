# type-safe-event-emitter
A zero-overhead, type-safe event emitter

## Description

This package doesn't contain any logic. It simply reexports Node.js's native
`EventEmitter` from the `events` module with type info that allows for type-safe
usage.

The following functions have been made type-safe:
```
addListener
emit
off
on
once
prependListener
prependOnceListener
removeAllListeners
removeListener
```

## Usage

Simply define a type/interface of listener functions with the event name (or
channel) as the name of the function, e.g.:

```ts
interface MessageMap {
  connect: () => void;
  disconnect: (code: number, reason?: string) => void;
}
```

This interface is passed as the generic paramater to the constructor function of
`TypeSafeEventEmitter`. `TypeSafeEventEmitter` will take all of those functions
and feed the type information into the `emit` and `on` calls.

## Examples

With the following setup:
```typescript
import TypeSafeEventEmitter from 'type-safe-event-emitter';

interface MessageMap {
  connect: () => void;
  disconnect: (code: number, reason?: string) => void;
  message: (content: string) => void
}

const emitter = new TypeSafeEventEmitter<MessageMap>();
```

### Listening

We can see all possible events are suggested by intellisense:
<img width="578" alt="image" src="https://user-images.githubusercontent.com/21286068/172693932-56b18002-cce3-4ecb-8b56-87f716ae8152.png">

After entering the event, intellisense gives the callback signature:
<img width="682" alt="image" src="https://user-images.githubusercontent.com/21286068/172694522-0e4f26c2-3924-4295-bf72-856a17a75e69.png">

All parameters are given by intellisense for the listener function:
<img width="766" alt="image" src="https://user-images.githubusercontent.com/21286068/172694680-bec5bbc3-ebca-491d-8625-c36254464455.png">

Listeners can be declared in a non-anonymous way using the message interface:
<img width="539" alt="image" src="https://user-images.githubusercontent.com/21286068/172694958-535b535b-fd5c-4ab6-a510-ec25bcff709e.png">

An incorrect listener cannot be used:
<img width="892" alt="image" src="https://user-images.githubusercontent.com/21286068/172695677-140fdded-b8de-414f-9b14-9468a5dc00a4.png">

### Emitting

Emitting events provides the same intellisense as listening:
<img width="601" alt="image" src="https://user-images.githubusercontent.com/21286068/172695850-f8eb84c6-f86a-4d45-9c62-ce67e20c924a.png">

All expected errors are reported, such as incorrect arity:
<img width="551" alt="image" src="https://user-images.githubusercontent.com/21286068/172695981-69a612b6-de41-4f9e-b046-2e67d10d00f6.png">
<img width="760" alt="image" src="https://user-images.githubusercontent.com/21286068/172696137-73df1407-bddc-468d-97d4-ac46d7cabba7.png">

And incorrect types being emitted:
<img width="885" alt="image" src="https://user-images.githubusercontent.com/21286068/172696735-08713c45-ef63-4f7f-bbf2-d7c8bd787054.png">

