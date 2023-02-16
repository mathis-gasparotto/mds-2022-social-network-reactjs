import { useState } from "react";

export function Alert({state, message}: {state: string, message: string}) {
  return(
    <div className={`alert alert-${state}`}>{message}</div>
  )
}