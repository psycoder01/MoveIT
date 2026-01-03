package org.backend

import cats.effect._
import cats.syntax.all._

import org.typelevel.vault.Vault

import fs2.io.net.Network
import com.comcast.ip4s._

import org.http4s._
import org.http4s.dsl.io._
import org.http4s.implicits._
import org.http4s.HttpRoutes
import org.http4s.ember.server.EmberServerBuilder

object Server extends IOApp.Simple:
  val routes = HttpRoutes.of[IO] { case _ =>
    Ok("The server is running")
  }
  val httpApp = routes.orNotFound

  def run =
    EmberServerBuilder
      .default[IO]
      .withHost(ipv4"0.0.0.0")
      .withPort(port"8080")
      .withHttpApp(httpApp)
      .build
      .use(_ => IO.never)
