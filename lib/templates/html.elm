module <%= moduleName %> exposing
  ( Model
  , Msg
  , init
  , update
  , subscriptions
  , view
  )


import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- MODEL


type alias Model =
  { value : Bool
  }


type alias Flags =
  { value : Bool
  }


init : Flags -> (Model, Cmd Msg)
init flags =
  (Model flags.value, Cmd.none)


-- UPDATE


type Msg = StubMsg


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    StubMsg ->
      (model, Cmd.none)


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- VIEW


view : Model -> Html Msg
view model =
  text "<%= moduleName %>"
