import React, { createContext, useContext, ReactNode, useState } from "react";

type DaemonContext = {
  sRegion: number;
  setSRegion: (region: number) => void;
};

type DaemonProps = {
  children: ReactNode;
};

const defaultContextValue: DaemonContext = {
  sRegion: -1,
  setSRegion: () => { },
};

const Daemon = createContext<DaemonContext>(defaultContextValue);

export function useDaemonContext() {
  const context = useContext(Daemon);
  return context;
}

export function DaemonProvider({ children }: DaemonProps) {
  const [sRegion, setSRegion] = useState<number>(-1);

  return (
    <Daemon.Provider value={{ sRegion, setSRegion }}>
      {children}
    </Daemon.Provider>
  );
}
