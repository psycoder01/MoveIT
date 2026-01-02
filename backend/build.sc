import mill._
import scalalib._

trait Base extends ScalaModule {
  val scalaVersion = "3.7.1"

  def ivyDeps = Agg(
    ivy"org.typelevel::cats-effect:3.6.3"
  )
}

object backend extends Base {}
