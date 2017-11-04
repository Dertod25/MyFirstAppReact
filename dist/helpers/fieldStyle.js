'use strict';

export function setFieldDecor(isTouched, isError){
  return (isTouched && isError) ?
    ' has-error' :
    '';
}
