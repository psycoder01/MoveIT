import mill._
import scalalib._

trait Base extends ScalaModule {
  val scalaVersion  = "3.7.1"
  val catsVersion   = "3.6.3"
  val http4sVersion = "0.23.23"

  def ivyDeps = Agg(
    ivy"org.typelevel::cats-effect:$catsVersion",
    ivy"org.http4s::http4s-ember-server:$http4sVersion",
    ivy"org.http4s::http4s-ember-client:$http4sVersion",
    ivy"org.http4s::http4s-dsl:$http4sVersion"
  )
}

object backend extends Base {}
