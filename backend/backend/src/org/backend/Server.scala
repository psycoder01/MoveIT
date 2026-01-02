package org.backend

import cats.effect._

object Server extends IOApp.Simple:
  def run: IO[Unit] =
    IO.println("This is the backend server")
