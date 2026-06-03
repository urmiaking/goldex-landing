FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["GoldEx.csproj", "./"]
RUN dotnet restore "./GoldEx.csproj"

# Copy everything else and build the project
COPY . .
RUN dotnet publish "GoldEx.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build the runtime container
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 8080 and configure ASP.NET Core to run on it
EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080

ENTRYPOINT ["dotnet", "GoldEx.dll"]
