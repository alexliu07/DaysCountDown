/*
    SnoreToast is capable to invoke Windows 8 toast notifications.
    Copyright (C) 2019  Hannah von Reth <vonreth@kde.org>

    SnoreToast is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    SnoreToast is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with SnoreToast.  If not, see <http://www.gnu.org/licenses/>.
*/

#pragma once

#include <string>

constexpr int SNORETOAST_VERSION_MAJOR = 0;
constexpr int SNORETOAST_VERSION_MINOR = 7;
constexpr int SNORETOAST_VERSION_PATCH = 0;
inline const std::wstring SNORETOAST_VERSION = L"0.7.0";

#define SNORETOAST_CALLBACK_GUID "{eb1fdd5b-8f70-4b5a-b230-998a2dc19303}"
