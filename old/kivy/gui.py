from kivy.app import App
from kivy.core.window import Window
from kivy.uix.widget import Widget
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
# from kivy.uix.floatlayout import FloatLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
# from kivy.uix.textinput import TextInput
# from kivy.uix.popup import Popup
from kivy.uix.image import Image

import glob

Window.clearcolor = .3, .3, .3, 1

'''
Always update here if change .kv
'''
T0_SCREENS = ['settings', 'input', 'pick_menu']
T1_SCREENS = ['delete_sheet']


screen_tier = 0


class gui(App):
    def __init__(self, **kwargs):
        super(gui, self).__init__(**kwargs)

        # establish previous_screen variable to be used in the back button
        self.previous_screen = ""

    def build(self):
        return ScreenManagement()


class ScreenManagement(ScreenManager):
    pass


'''
        ----    SCREENS     ----
'''


class HomeScreen(Screen):
    def __init__(self, **kwargs):
        super(Screen, self).__init__(**kwargs)

    # def refresh_datasets(self):
    #     downloader.master()


'''
        ----    BUTTONS     ----
'''


class HomeButton(Button):
    def __init__(self, **kwargs):
        super(HomeButton, self).__init__(**kwargs)
        # self.add_widget(Label(text='Back', on_press=self.on_press))

    def on_press(self):
        App.get_running_app().root.current = 'home'


class BackButton(Button):
    def __init__(self, **kwargs):
        super(BackButton, self).__init__(**kwargs)
    # back = ObjectProperty()

    def on_press(self):
        if App.get_running_app().root.current in tuple(T1_SCREENS):
            App.get_running_app().root.current = App.get_running_app().root.previous()
        else:
            App.get_running_app().root.current = 'home'


class ImageGallery(BoxLayout):
    def __init__(self, **kwargs):
        super(ImageGallery, self).__init__(**kwargs)
        images = glob.glob('img\*.bmp')
        # image = AsyncImage(source='img\*.bmp')
        self.cols = 3
        for img in images:
            thumb = ImageThumbnail(source=img)
            self.add_widget(thumb)


class ImageThumbnail(Image):
    def on_touch_down(self, touch):
        if self.collide_point(*touch.pos):
            print(self.source)
    # pass


if __name__ == '__main__':
    gui().run()
