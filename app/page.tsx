"use client";

import Image from "next/image";
import { PointerEvent, useCallback, useRef, useState } from "react";

import { getEscapedButtonPosition, Point } from "./no-button-motion";

const initialNoPosition = {
  x: 0,
  y: 0
};

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<Point>(initialNoPosition);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonInitialized = useRef(false);

  const moveNoButton = useCallback((event: PointerEvent<HTMLElement>) => {
    const button = noButtonRef.current;
    const pointerPosition = {
      x: event.clientX,
      y: event.clientY
    };

    if (!button) {
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const currentPosition = noButtonInitialized.current
      ? noPosition
      : {
          x: buttonRect.left,
          y: buttonRect.top
        };

    noButtonInitialized.current = true;

    setNoPosition(
      getEscapedButtonPosition({
        currentPosition,
        pointerPosition,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        button: {
          width: buttonRect.width,
          height: buttonRect.height
        }
      })
    );
  }, [noPosition]);

  const rejectNoButton = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      moveNoButton(event);
    },
    [moveNoButton]
  );

  if (accepted) {
    return (
      <main className="page pageAccepted">
        <section className="acceptedPanel" aria-live="polite">
          <div className="photoFrame">
            <Image
              src="/foto-convite.jpg"
              alt="Foto especial do convite"
              fill
              sizes="(max-width: 768px) 86vw, 420px"
              priority
            />
          </div>
          <p className="acceptedEyebrow">Combinado</p>
          <h1>Te aguardo ent&atilde;o, meu amor.</h1>
          <p className="acceptedText">
            Hoje &agrave; noite tem cobertor, Senhor dos An&eacute;is e a melhor
            companhia do mundo.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page invitationPage" onPointerMove={moveNoButton}>
      <section className="invitePanel">
        <p className="eyebrow">Convite oficial da Terra M&eacute;dia</p>
        <h1>
          Voc&ecirc; est&aacute; convidada a assistir Senhor dos An&eacute;is comigo
          hoje &agrave; noite
        </h1>
        <div className="actions" aria-label="Respostas do convite">
          <button className="yesButton" type="button" onClick={() => setAccepted(true)}>
            Sim
          </button>
          <button
            ref={noButtonRef}
            className={noButtonInitialized.current ? "noButton isEscaping" : "noButton"}
            style={
              noButtonInitialized.current
                ? {
                    left: noPosition.x,
                    top: noPosition.y
                  }
                : undefined
            }
            type="button"
            onPointerEnter={moveNoButton}
            onPointerDown={rejectNoButton}
            onClick={(event) => event.preventDefault()}
            tabIndex={-1}
          >
            N&atilde;o
          </button>
        </div>
      </section>
    </main>
  );
}
